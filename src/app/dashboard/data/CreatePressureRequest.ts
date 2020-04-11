import {CreateMeasurementRequest} from './CreateMeasurementRequest';
import {MeasurementUnit} from './MeasurementUnit';

export class CreatePressureRequest extends CreateMeasurementRequest {

  constructor(private systolic: number, private diastolic: number, unit: MeasurementUnit) {
    super(unit);
  }
}
