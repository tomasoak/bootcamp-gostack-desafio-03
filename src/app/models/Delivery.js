import  Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init({
      id: Sequelize.INTEGER,
      recipient_id: Sequelize.INTEGER,
      deliveryman_id: Sequelize.INTEGER,
      signature_id: Sequelize.INTEGER,
      product: Sequelize.STRING,
      canceled_at: Sequelize.DATE,
      start_date: Sequelize.DATE,
      end_date: Sequelize.DATE,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    },
    {
      sequelize
    })

    return this;
  } 

  static associate(models) {
    this.belongsTo(model.Recipient, { foreignKey: 'recipient_id', as: 'recipient' });
    this.belongsTo(model.Deliveryman, { foreignKey: 'deliveryman_id', as: 'deliveryman' });
    this.belongsTo(models.File, { foreignKey: 'signature_id', as: 'signature' });
  }
}

export default new Delivery();