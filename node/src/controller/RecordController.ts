import {Request, Response} from 'express';
import {Autowire, ExpressController, GetMapping, PostMapping} from '@ppirogov/express-decorators';
import {RecordServiceInterface} from '../service';

@ExpressController
export class RecordController {

  @Autowire('RecordService')
  recordService: RecordServiceInterface;

  @PostMapping('/api/records')
  recordPost(req: Request, res: Response) {
    this.recordService.createRecord(req.body).then(record => {
      res.setHeader('Content-Type', 'application/json');
      res.send(record);
    }).catch(error => {
      console.error(error);
      res.status(500).end();
    });
  }

  @GetMapping('/api/records')
  recordsGet(req: Request, res: Response) {
    this.recordService.getRecords().then(records => {
      res.setHeader('Content-Type', 'application/json');
      res.send(records);
    }).catch(error => {
      console.error(error);
      res.status(500).end();
    });
  }

}
