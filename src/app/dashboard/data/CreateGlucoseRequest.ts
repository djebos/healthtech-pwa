import {CreateMeasurementRequest} from './CreateMeasurementRequest';
import {MeasurementUnit} from './MeasurementUnit';

export class CreateGlucoseRequest extends CreateMeasurementRequest {

  constructor(private glucose: number, unit: MeasurementUnit) {
    super(unit);
  }
}
