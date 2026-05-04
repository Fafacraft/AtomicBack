import { Atom } from '../models/atom.model.js';

export const atomRepository = {
  findAll: async () => {
    return Atom.findAll();
  },

  findById: async (Atom_Id) => {
    return Atom.findByPk(Atom_Id);
  },

  findByUser: async (User_Id) => {
    return Atom.findAll({ where: { User_Id } });
  },

  create: async ({ Atom_Id, User_Id, Atom_proton, Atom_neutron, Atom_electron, Atom_name }) => {
    return Atom.create({
      Atom_Id: Atom_Id,
      User_Id: User_Id,
      Atom_proton: Atom_proton,
      Atom_neutron: Atom_neutron,
      Atom_electron: Atom_electron,
      Atom_name: Atom_name,
    });
  },

  update: async (atom, data) => {
    return atom.update(data);
  },

  delete: async (atom) => {
    return atom.destroy();
  },
};