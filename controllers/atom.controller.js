import { atomService } from '../services/atom.service.js';

export const atomController = {
    getStability: async (req, res, next) => {
        try {
            const { proton, neutron } = req.query;
            const stability = await atomService.getStability(proton, neutron);

            return res.status(200).json({ stability });
        } catch (err) {
            next(err);
        }
    }
}