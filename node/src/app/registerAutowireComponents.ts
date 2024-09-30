import * as repositories from "../repository";
import * as services from "../service";

export default [...Object.keys(repositories), ...Object.keys(services)];
