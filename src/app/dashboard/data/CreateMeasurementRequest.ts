import {MeasurementUnit} from './MeasurementUnit';
import {MeasurementType} from './MeasurementType';

export class CreateMeasurementRequest {
  constructor(private value: string, private unit: MeasurementUnit, private type: MeasurementType) {
  }
}
