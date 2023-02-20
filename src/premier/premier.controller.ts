import { Controller, Delete, Get, Post, Put, Patch } from '@nestjs/common';

@Controller('premier')
export class PremierController {
  @Get('get')
  get() {
    return 'get method';
  }
  @Post('post')
  post() {
    return 'post method';
  }
  @Delete('delete')
  delete() {
    return 'delete method';
  }
  @Put('put')
  put() {
    return 'put method';
  }
  @Patch('patch')
  patch() {
    return 'patch method';
  }
}
