import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import User from '../models/User';
import File from '../models/File';

class DeliverymanController {
  async store(req, res) {
    /*TODO FIX ADMIN ONLY*/
    const isAdmin = await User.findByPk(req.userId, req.admin);

    if (!isAdmin) {
      return res.status(401).json({ error: 'Not Authorized' });
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation failed' });
    };

    const userExists = await Deliveryman.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'Delivery man already exists' });
    };

    const deliveryman = await Deliveryman.create(req.body);

    return res.json(deliveryman);
  };

  async index(req, res) {
    const couriers = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      limit: 10,
      order: ['name'],
      include: [{
        model: File, 
        as: 'avatar',
        attributes: ['id', 'path', 'url'],
      }]
    })

    if (!couriers) {
      return res.status(400).json({ error: 'There are not any delivery man' })
    }

    return res.json(couriers);
  };

  async show(req, res) {
    const courires = await Deliveryman.findByPk(req.params.id);

    if(!courires) {
      return res.status(400).json({ error: 'Delivery man does not exist.' })
    }

    return res.json(courires);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation failed' });
    }

    const { email } = req.body;

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (email && email !== deliveryman.email) {
      const userExists = await Deliveryman.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'Delivery man already exists' });
      }
    }

    const { id, name } = await deliveryman.update(req.body);

    return res.json({ id, name, email });
  }

  async delete(req, res) {
    const courires = await Deliveryman.findByPk(req.params.id);

    if(!courires) {
      return res.status(400).json({ error: 'Delivery man does not exist.' })
    }

    await courires.destroy();

    return res.send();
  }
}

export default new DeliverymanController();