import {MeasurementType} from './MeasurementType';
import {publish} from 'rxjs/operators';

export class EnumUtils {
  public static toMeasurementType(type: string): MeasurementType {
    if (type === 'temp') {
      return MeasurementType.TEMPERATURE;
    } else {
      return MeasurementType[type.toUpperCase()];
    }
  }
}
