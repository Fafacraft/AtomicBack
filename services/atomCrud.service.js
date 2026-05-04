import { atomRepository } from '../repositories/atom.repository.js';

export const atomCrudService = {
    createAtom: async ({ User_Id, Atom_proton, Atom_neutron, Atom_electron, Atom_name }) => {
        console.log('Creating atom with User_Id:', User_Id);

        const atom = await atomRepository.create({
            User_Id,
            Atom_proton,
            Atom_neutron,
            Atom_electron,
            Atom_name,
        });

        return atom;
    },

    // READ ALL
    getAllAtoms: async () => {
        const atoms = await atomRepository.findAll();
        return atoms;
    },

    // READ ONE
    getAtomById: async (id) => {
        const atom = await atomRepository.findById(id);
        if (!atom) {
            const error = new Error('Atom not found');
            error.status = 404;
            throw error;
        }
        return atom;
    },

    // READ ONE
    getAtomByUserId: async (userId) => {
        const atom = await atomRepository.findByUserId(userId);
        if (!atom) {
            const error = new Error('Atom not found');
            error.status = 404;
            throw error;
        }
        return atom;
    },

    // UPDATE
    updateAtom: async (id, data) => {
        const atom = await atomRepository.findById(id);
        if (!atom) {
            const error = new Error('Atom not found');
            error.status = 404;
            throw error;
        }

        const mappedData = {
            User_Id: data.User_Id,
            Atom_proton: data.Atom_proton,
            Atom_neutron: data.Atom_neutron,
            Atom_electron: data.Atom_electron,
            Atom_name: data.Atom_name,
        };

        const updated = await atomRepository.update(atom, mappedData);
        return updated;
    },

    // DELETE
    deleteAtom: async (id) => {
        const atom = await atomRepository.findById(id);
        if (!atom) {
            const error = new Error('Atom not found');
            error.status = 404;
            throw error;
        }

        await atomRepository.delete(atom);
        return;
    },
};