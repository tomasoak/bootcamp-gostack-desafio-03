import Mail from "../../lib/Mail";

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  async handle({ data }) {
     const { deliveryman, recipient, delivery } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova encomenda a ser retirada',
      template: 'delivery',
      context: {
        deliveryman: deliveryman.name,
        recipient: recipient.name,
        address: `CEP - ${recipient.zip}, ${recipient.street}, Nº ${recipient.number}, ${recipient.city} - ${recipient.state}`,
        product: delivery.product
        },
      });
    }
  }

export default new DeliveryMail();