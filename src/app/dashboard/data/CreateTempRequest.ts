import {CreateMeasurementRequest} from './CreateMeasurementRequest';
import {MeasurementUnit} from './MeasurementUnit';

export class CreateTempRequest extends CreateMeasurementRequest {

  constructor(private temp: number, unit: MeasurementUnit) {
    super(unit);
  }
}
