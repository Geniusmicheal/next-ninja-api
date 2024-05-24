import { IsEnum, MinLength } from 'class-validator';
export class createNinjaDto {
    @MinLength(3)
    name: string;

    @IsEnum(['stars' , 'nunchucks'], {message: 'Use correct weapon!'})
    weapon: 'stars' | 'nunchucks';
}