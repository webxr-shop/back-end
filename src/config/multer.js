const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        if (!!file.originalname) {
          file.key = `${hash.toString('hex')}-${file.originalname}`;
        } else {
          file.key = `${hash.toString('hex')}`;
        }

        cb(null, file.key);
      });
    },
  }),

  cloud: multerS3({
    s3: new aws.S3(),
    bucket: 'plataforma-webxr',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        if (!!file.originalname) {
          var fileName = `${hash.toString('hex')}-${file.originalname}`;
        } else {
          var fileName = `${hash.toString('hex')}`;
        }

        cb(null, fileName);
      });
    },
  }),
};

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes['cloud'],
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/glb',
      'application/gltf-binary',
      'application/fbx',
      'model/gltf-binary',
      'model/gltf+json',
      'application/octet-stream',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  },
};
