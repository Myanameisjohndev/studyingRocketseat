import { Rentals } from '@modules/rentals/infra/typeorm/entitiees/Rentals';
import { AppError } from '../../../../shared/errors/AppError';
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from '@shared/Container/providers/DateProvider/IDateProvider';
interface IRequest{
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalsUseCase{


    constructor(
        private rentalRepository: IRentalsRepository,
        private dateProvider: IDateProvider
    ){}

    async execute({ car_id,user_id, expected_return_date }: IRequest) : Promise<Rentals>{
        const minimumHour = 24;
        
        const carUnavaliable = await this.rentalRepository.findOpenRentalByCar(car_id);       

        if(carUnavaliable){
            throw new AppError("Car is unavailable");
        }

        const user = await this.rentalRepository.findOpenRentalByUser(user_id);       

        if(user){
            throw new AppError("There a rantle in progress for user");
        }

        const dateNow = this.dateProvider.dateNow();
        const compare =  this.dateProvider.compareInHours(dateNow,expected_return_date)

        if(compare < minimumHour){
            throw new AppError("Invalid Return time");
        }

        const rental = await this.rentalRepository.create({car_id,user_id, expected_return_date  })

        return rental;
    }

}

export { CreateRentalsUseCase };