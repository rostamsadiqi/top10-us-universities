import { HttpParams } from '@angular/common/http';
export class Helper{
    public static extractParamas(params: any): HttpParams {
        let _param = new HttpParams();
        let _obj = Object.keys(params) as [];
        _obj.forEach((prm) => {
          if (params[prm] instanceof Number) {
            _param = _param.set(prm, params[prm].toString());
          }
          _param = _param.set(prm, params[prm]);
        });
        return _param;
      }
}