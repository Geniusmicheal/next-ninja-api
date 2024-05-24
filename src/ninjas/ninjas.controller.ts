import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { createNinjaDto } from './dto/create-ninja.dto';
import { updateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
// @UseGuards(BeltGuard)  // To protect all the method or  class or all the end point
export class NinjasController {
    constructor(private readonly ninjaservice: NinjasService){}

    @Get() //GET /ninjas
    getNinjas(@Query('weapon') weapon:'stars' | 'nunchucks') {
        return this.ninjaservice.getNinjas()
    }

    @Get(':id') //GET /ninjas/:id
    getNinjaID(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.ninjaservice.getNinja(+id)
        } catch (error) {
            throw new NotFoundException();
        }
        
    }

    @Post() // Post /ninjas 
    @UseGuards(BeltGuard) // to protect a method or an end point
    createNinja(@Body(new ValidationPipe()) createNinjaDto: createNinjaDto) {
        return this.ninjaservice.createNinja(createNinjaDto)
    }

    @Put(':id') // Put /ninjas/:id
    putNinja(@Param('id') id: string, @Body() updateNinjaDto: updateNinjaDto) {
        return this.ninjaservice.updateNinja(+id, updateNinjaDto)

    }

    @Delete(':id') // delete /ninjas/:id
    deleteNinja(@Param('id') id: string) {
        return this.ninjaservice.removeNinja(+id)
    }
}
