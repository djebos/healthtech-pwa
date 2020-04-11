import {CreateMeasurementRequest} from './CreateMeasurementRequest';
import {MeasurementUnit} from './MeasurementUnit';

export class CreatePulseRequest extends CreateMeasurementRequest {

  constructor(private pulse: number, unit: MeasurementUnit) {
    super(unit);
  }
}
