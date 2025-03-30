import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty, IsString, Matches, ValidateIf } from "class-validator";

/**
 * DTO para crear un nuevo usuario
 * @description DTO para crear un nuevo usuario en la base de datos
 */
export class CreateUserDto {
    @ApiProperty({
        description: "Nombre del usuario",
        example: "Juan Perez",
        required: true,
        type: String,
    })
    @IsString({ message: "El nombre debe ser una cadena de texto", })
    @IsNotEmpty({ message: "El nombre no puede estar vacío" })
    name: string;

    @ApiProperty({
        description: "Correo electrónico del usuario",
        example: "ejemplo@email.com",
        required: true,
        type: String,
    })
    @IsNotEmpty({ message: "El correo no puede estar vacío" })
    @IsString({ message: "El correo debe ser una cadena de texto" })
    @IsEmail({}, { message: "El correo no es válido" })
    email: string;

    @ApiProperty({
        description: "Contraseña del usuario",
        example: "Contraseña123",
        required: true,
        type: String,
    })
    @IsString({ message: "La contraseña debe ser una cadena de texto" })
    @IsNotEmpty({ message: "La contraseña no puede estar vacía" })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: "La contraseña debe tener al menos 8 caracteres, una letra y un número" })
    password: string;

    @ApiProperty({
        description: "Confirmación de la contraseña del usuario",
        example: "Contraseña123",
        required: true,
        type: String,
    })
    @IsString({ message: "La contraseña de confirmación debe ser una cadena de texto" })
    @IsNotEmpty({ message: "La contraseña de confirmación no puede estar vacía" })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: "La contraseña de confirmación debe tener al menos 8 caracteres, una letra y un número" })
    @ValidateIf((o) => o.password, { message: "La contraseña y la contraseña de confirmación no coinciden" })
    confirmPassword: string;

    @ApiProperty({
        description: "Rol del usuario",
        example: "admin",
        required: true,
        type: String,
    })
    @IsString({ message: "El rol debe ser una cadena de texto" })
    @IsNotEmpty({ message: "El rol no puede estar vacío" })
    @IsIn(["admin", "user"], { message: "El rol debe ser admin o user" })
    @IsString({ message: "El rol debe ser una cadena de texto" })
    role: string;
}
