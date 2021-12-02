import {
  clientById,
  createClient,
  deleteClient,
  getAllClients,
  updateClient,
} from "../db";
import { Controller, Get, Route, Path, Post, Body, Put, Delete } from "tsoa";
import { ClientModel } from "../models/client";

@Route("/client")
export class ClientController extends Controller {
  @Get("")
  public async getAll(): Promise<ClientModel[]> {
    try {
      const clients = await getAllClients();
      return clients;
    } catch (err) {
      console.error(err);
      this.setStatus(500);
    }
  }

  @Get("/{id}")
  public async getClientById(@Path() id: string): Promise<ClientModel> {
    try {
      console.log(id);
      const client = await clientById(id);
      return client;
    } catch (err) {
      console.error(err);
      this.setStatus(500);
    }
  }

  @Post()
  public async create(@Body() dto: ClientModel): Promise<ClientModel> {
    try {
      const client = await createClient(dto);
      return client;
    } catch (err) {
      console.error(err);
      this.setStatus(500);
    }
  }
  @Put("/{id}")
  public async update(
    @Path() id: string,
    @Body() dto: ClientModel
  ): Promise<ClientModel> {
    try {
      const client = await updateClient(id, dto);
      return client;
    } catch (err) {
      console.error(err);
      this.setStatus(500);
    }
  }
  @Delete("/{id}")
  public async delete(@Path() id: string): Promise<ClientModel> {
    try {
      const client = await deleteClient(id);
      return client;
    } catch (err) {
      console.error(err);
      this.setStatus(500);
    }
  }
}
