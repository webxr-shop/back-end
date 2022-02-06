// const Pet = require('../app/models/Pet');
// const Media = require('../app/models/Media');

// module.exports = {
//   async store(req, res) {
//     console.log('Request post /media/:pet_id');
//     const { id: petId } = await Pet.findByPk(parseInt(req.params.pet_id));

//     if (!petId) {
//       return res.status(404).json({ error: 'Pet not found!' });
//     }

//     if (req.file === null || req.file === undefined) {
//       return res.status(406).json({ Error: 'File not received!' });
//     }

//     const { originalname: name, size, key, location: url = null } = req.file;

//     const media = await Media.create({
//       name,
//       size,
//       key,
//       url,
//       petId,
//     });

//     return res.json(media);
//   },
// };
