// @ts-nocheck
import Client, { ClientModel } from "../models/client";

export const clientById = async (id: string): Promise<ClientModel> => {
  const client = await Client.findById(id);
  return client;
};

export const getAllClients = async (): Promise<ClientModel[]> => {
  const clients = await Client.find();
  return clients;
};

export const createClient = async (body: any): Promise<ClientModel> => {
  const client = await Client.create(body);
  return client;
};

export const updateClient = async (id, body: any): Promise<ClientModel> => {
  const client = await Client.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });
  return client;
};

export const deleteClient = async (id: string): Promise<ClientModel> => {
  const client = await Client.findByIdAndRemove(id);
  return client;
};
