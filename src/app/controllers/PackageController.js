import { Op } from 'sequelize';
import { setHours, setSeconds, setMinutes, startOfHour, format, startOfDay, endOfDay, parseISO } from 'date-fns';

import Delivery from '../models/Delivery';

class PackageControllers {
  async store(req, res){
    return res.json({ ok: true })
  }
}

export default new PackageControllers();