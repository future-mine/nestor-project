// @ts-nocheck
import Provider, { ProviderModel } from "../models/provider";
import Client, { ClientModel } from "../models/client";

export const providerById = async (id: string): Promise<ProviderModel> => {
  const provider = await Provider.findById(id);
  return provider;
};

export const getAllProviders = async (): Promise<ProviderModel[]> => {
  const providers = await Provider.find();
  return providers;
};

export const createProvider = async (body: any): Promise<ProviderModel> => {
  const provider = await Provider.create(body);
  return provider;
};

export const updateProvider = async (id, body: any): Promise<ProviderModel> => {
  const provider = await Provider.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });
  return provider;
};

export const deleteProvider = async (id: string): Promise<ProviderModel> => {
  const provider = await Provider.findByIdAndRemove(id, {});
  await Client.updateMany({}, { $pull: { providers: provider._id } });
  return provider;
};
