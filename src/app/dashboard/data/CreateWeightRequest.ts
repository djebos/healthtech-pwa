import {CreateMeasurementRequest} from './CreateMeasurementRequest';
import {MeasurementUnit} from './MeasurementUnit';

export class CreateWeightRequest extends CreateMeasurementRequest {

  constructor(private weight: number, unit: MeasurementUnit) {
    super(unit);
  }
}
