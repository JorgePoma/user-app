import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongoIdPipe } from 'src/common/pipes/mongoId.pipe';
import { Types } from 'mongoose';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario', description: 'Crea un nuevo usuario en la base de datos' })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: CreateUserDto, description: 'Usuario creado' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':limit/:skip')
  @ApiOperation({ summary: 'Obtener todos los usuarios', description: 'Limite y skip para paginación' })
  @ApiParam({ name: 'limit', type: Number, description: 'Número máximo de usuarios a obtener' })
  @ApiParam({ name: 'skip', type: Number, description: 'Número de usuarios a omitir' })
  @ApiOkResponse({ type: CreateUserDto, isArray: true, description: 'Lista de usuarios' })
  findAll(
    @Param('limit', MongoIdPipe) limit: number,
    @Param('skip', MongoIdPipe) skip: number,
  ) {
    return this.userService.findAll(limit, skip);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID', description: 'Devuelve un usuario específico por su ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID del usuario' })
  @ApiOkResponse({ type: CreateUserDto, description: 'Usuario encontrado' })
  findOne(@Param('id', MongoIdPipe) id: Types.ObjectId) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por ID', description: 'Actualiza un usuario específico por su ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID del usuario' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ type: UpdateUserDto, description: 'Usuario actualizado' })
  update(@Param('id', MongoIdPipe) id: Types.ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID', description: 'Elimina un usuario específico por su ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID del usuario' })
  @ApiOkResponse({ description: 'Usuario eliminado' })
  remove(@Param('id', MongoIdPipe) id: Types.ObjectId) {
    return this.userService.remove(id);
  }
}
