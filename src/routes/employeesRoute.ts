import express from 'express';
import { employerController } from '../controllers/employerController';
const router = express();

router.get('/', employerController.listEmployees);

router.put('/:id', employerController.updateEmployer);

router.get('/:id', employerController.getEmoployer);

router.delete('/:id', employerController.deleteEmployer);

router.post('/', employerController.createEmployer);

module.exports = router;
