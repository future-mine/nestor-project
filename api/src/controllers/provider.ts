import { Request, Response } from "express";
import {
  createProvider,
  deleteProvider,
  getAllProviders,
  providerById,
  updateProvider,
} from "../db";
import { Controller, Get, Route, Path, Post, Body, Delete, Put } from "tsoa";
import { ProviderModel } from "../models/provider";

@Route("/provider")
export class ProviderController extends Controller {
  @Get("/{id}")
  public async getProviderById(@Path() id: string): Promise<any> {
    try {
      const provider = await providerById(id);
      return provider;
    } catch (err) {
      console.error(err);
      this.setStatus(500);
    }
  }
  @Get("")
  public async getAll(): Promise<ProviderModel[]> {
    try {
      const providers = await getAllProviders();
      return providers;
    } catch (err) {
      console.error(err);
      this.setStatus(500);
    }
  }

  @Post()
  public async create(@Body() dto: ProviderModel): Promise<ProviderModel> {
    try {
      const provider = await createProvider(dto);
      return provider;
    } catch (err) {
      console.error(err);
      this.setStatus(500);
    }
  }
  @Put("/{id}")
  public async update(
    @Path() id: string,
    @Body() dto: ProviderModel
  ): Promise<ProviderModel> {
    try {
      const provider = await updateProvider(id, dto);
      return provider;
    } catch (err) {
      console.error(err);
      this.setStatus(500);
    }
  }
  @Delete("/{id}")
  public async delete(@Path() id: string): Promise<ProviderModel> {
    try {
      const provider = await deleteProvider(id);
      return provider;
    } catch (err) {
      console.error(err);
      this.setStatus(500);
    }
  }
}
