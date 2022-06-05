import { Router } from "express";

class IndexRoutes {
    public router: Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    config(): void{
        this.router.get('/', (req, res) => {res.json({message : 'API Works'}); });
        this.router.get('/usuario', (req, res) => {res.json({message : 'API Usuario'}); });
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;