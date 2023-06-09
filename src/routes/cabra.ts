import {Router} from "express";
import fs from "fs";

const router = Router();

router.get('/:number', (req, res) => {

    try {
        const file_number_raw = req.params.number;
        let file_number: number;
        try {
            file_number = parseInt(file_number_raw);
            if (isNaN(file_number) || file_number < 0) {
                res.status(400).json({error: "Invalid number"});
                return;
            }
        } catch (e) {
            res.status(400).json({error: "Invalid number"});
            return;
        }


        const files: string[] = fs.readdirSync('./assets').filter(file => file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".jpeg"));
        if (files.length === 0) {
            res.status(404).json({error: "No files found"});
            return;
        }

        const file = files[file_number % files.length];

        res.sendFile(file, {root: './assets'});
    } catch (e) {
        res.status(500).json({error: "Internal server error"});
    }
});

export default router;