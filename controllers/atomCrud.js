import Joi from 'joi';
import { atomCrudService } from '../services/atomCrud.service.js';

const createAtomSchema = Joi.object({
    User_Id: Joi.number().integer().required(),
    Atom_proton: Joi.number().integer().required(),
    Atom_neutron: Joi.number().integer().required(),
    Atom_electron: Joi.number().integer().required(),
    Atom_name: Joi.string().max(80).optional(),
});

const updateAtomSchema = Joi.object({
    User_Id: Joi.number().integer().required(),
    Atom_proton: Joi.number().integer().required(),
    Atom_neutron: Joi.number().integer().required(),
    Atom_electron: Joi.number().integer().required(),
    Atom_name: Joi.string().max(80).optional(),
});

export const atomCrud = {
    // POST /atoms
    createAtom: async (req, res, next) => {
        try {
            const { error, value } = createAtomSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.message });
            }

            const atom = await atomCrudService.createAtom(value);

            return res.status(201).json({
                Atom_Id: atom.Atom_Id,
                User_Id: atom.User_Id,
                Atom_proton: atom.Atom_proton,
                Atom_neutron: atom.Atom_neutron,
                Atom_electron: atom.Atom_electron,
                Atom_name: atom.Atom_name,
            });
        } catch (err) {
            next(err);
        }
    },

    // GET /atoms
    getAtoms: async (req, res, next) => {
        try {
            const atoms = await atomCrudService.getAllAtoms();

            const payload = atoms.map((a) => ({
                Atom_Id: a.Atom_Id,
                User_Id: a.User_Id,
                Atom_proton: a.Atom_proton,
                Atom_neutron: a.Atom_neutron,
                Atom_electron: a.Atom_electron,
                Atom_name: a.Atom_name,
            }));

            return res.status(200).json(payload);
        } catch (err) {
            next(err);
        }
    },

    // GET /atoms/:id
    getAtomById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const atom = await atomCrudService.getAtomById(id);

            return res.status(200).json({
                Atom_Id: atom.Atom_Id,
                User_Id: atom.User_Id,
                Atom_proton: atom.Atom_proton,
                Atom_neutron: atom.Atom_neutron,
                Atom_electron: atom.Atom_electron,
                Atom_name: atom.Atom_name,
            });
        } catch (err) {
            next(err);
        }
    },

    // GET /atoms/user/:userId
    getAtomsByUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const atoms = await atomCrudService.getAtomByUserId(userId);
            const payload = atoms.map((a) => ({
                Atom_Id: a.Atom_Id,
                User_Id: a.User_Id,
                Atom_proton: a.Atom_proton,
                Atom_neutron: a.Atom_neutron,
                Atom_electron: a.Atom_electron,
                Atom_name: a.Atom_name,
            }));
            return res.status(200).json(payload);
        } catch (err) {
            next(err);
        }
    },

    // PUT /atoms/:id
    updateAtom: async (req, res, next) => {
    try {
        const { id } = req.params;

        const { error, value } = updateAtomSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const updated = await atomCrudService.updateAtom(id, value);

        return res.status(200).json({
            Atom_Id: updated.Atom_Id,
            User_Id: updated.User_Id,
            Atom_proton: updated.Atom_proton,
            Atom_neutron: updated.Atom_neutron,
            Atom_electron: updated.Atom_electron,
            Atom_name: updated.Atom_name,
        });
    } catch (err) {
        next(err);
    }
    },

    // DELETE /atoms/:id
    deleteAtom: async (req, res, next) => {
        try {
            const { id } = req.params;

            await atomCrudService.deleteAtom(id);

            return res.status(204).send();
        } catch (err) {
            next(err);
        }
    },
};