import * as Yup from 'yup';
import { startOfHour, isBefore, parseISO } from 'date-fns';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

import DeliveryMail from '../jobs/DeliveryMail';
import Queue from '../../lib/Queue';


class DeliveryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),

    })

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation failed' });
    };

    const { deliveryman_id, recipient_id, product } = req.body;

    const recipient = await Recipient.findByPk(recipient_id, {
      attributes: [
        'name',
        'street',
        'number',
        'complement',
        'state',
        'city',
        'zip',
      ],
    });

    const deliveryman = await Deliveryman.findByPk(deliveryman_id, {
      attributes: ['name', 'email',]
    });

    if (!recipient || !deliveryman) {
      return res.status(404).json({ error: 'Not found recipient or deliveryman' });
    };

    const deliveryExists = await Delivery.findOne({
      where: {
        recipient_id,
        deliveryman_id,
        canceled_at: null,
        start_date: null,
        end_date: null,
        signature_id: null,
      }
    });

    if (deliveryExists) {
      return res.status(401).json({ error: 'Delivery already exists' })
    };

    const delivery = await Delivery.create({
      deliveryman_id,
      recipient_id,
      product
    });

    await Queue.add(DeliveryMail.key, {
      recipient,
      deliveryman,
      delivery,
    });

    return res.json(delivery);
  };

  async index(req, res) {
    const delivery = await Delivery.findAll({
      where: {canceled_at: null, end_date: null},
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
            include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url']
            }
          ]
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip'
          ]
        },
      ]
    })

    if (!delivery){
      return res.status(400).json({ error: 'Delivery does not exists'});
    }

    return res.json(delivery);
  }

  async show(req, res) {
    const { id } = req.params
    const delivery = await Delivery.findByPk(id, {
      where: {canceled_at: null, end_date: null},
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
            include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url']
            }
          ]
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip'
          ]
        },
      ],
      order: ['id'],
    });

    if (!delivery){
      return res.status(400).json({ error: 'Delivery does not exists'});
    }

    return res.json(delivery);
  }

  async update(req, res){
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      signature_id: Yup.number(),
      product: Yup.string(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    })
    
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation failed' });
    };

    const { id } = req.params;
    const { start_date, end_date } = req.body;

    const hourStart = startOfHour(parseISO(start_date));
    const hourEnd = startOfHour(parseISO(end_date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not allowed' });
    }

    if(isBefore(hourEnd, new Date())) {
      return res.status(400).json({ error: 'Past dates are not allowed' });
    }

    const delivery = await Delivery.findByPk(id);

    if (!delivery){
      return res.status(400).json({ error: 'Delivery does not exists'});
    } 

    const { deliveryman_id, recipient_id, signature_id, product } = await delivery.update(req.body);

    return res.json({
      id,
      deliveryman_id,
      recipient_id,
      signature_id,
      product,
      start_date,
      end_date
    });
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      res.status(400).json({ error: 'Delivery does not exists' });
    }

    await delivery.destroy();

    return res.send();
  }
}

export default new DeliveryController();