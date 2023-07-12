import express from 'express';
import crypto from 'crypto';
import multer from 'multer';
import fs from 'fs';
import cors from 'cors';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.options('*', cors());

app.get('/', (req, res) => {
    res.send('HEY!');
});

app.post('/', upload.single('file'), async (req, res) => {
  try {
    const id = crypto.randomBytes(16).toString("hex");

    fs.renameSync(req.file!.path, `uploads/${id}`);

    res.json({
      url: `${req.protocol}://${req.get('host')}/uploads/${id}`
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Error uploading file');
  }
});

app.get('/uploads/:id', async (req, res) => {
  const id = req.params.id.split('.')[0]; // ignore file extension
  const file = `uploads/${id}`;

  if (!fs.existsSync(file)){
    return res.status(404).send('File not found');
  }

  res.download(file, err => {
    if(err) {
      console.error(err);
    } else {
      setTimeout(() => {
      fs.unlinkSync(file);
      }, 5000);
    }
  });
});

app.listen(process.env.PORT || 3456, () =>{
  console.log(`Listening on http://localhost:${process.env.PORT || 3456}...`)
});
