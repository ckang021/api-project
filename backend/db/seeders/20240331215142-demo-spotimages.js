'use strict';

const { SpotImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://cdnb.artstation.com/p/assets/images/images/071/488/605/large/tugba-oncul-gamerroom2.jpg?1705317966',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://cdnb.artstation.com/p/assets/images/images/071/488/605/large/tugba-oncul-gamerroom2.jpg?1705317966',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://cdnb.artstation.com/p/assets/images/images/071/488/605/large/tugba-oncul-gamerroom2.jpg?1705317966',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://cdnb.artstation.com/p/assets/images/images/071/488/605/large/tugba-oncul-gamerroom2.jpg?1705317966',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://cdnb.artstation.com/p/assets/images/images/071/488/605/large/tugba-oncul-gamerroom2.jpg?1705317966',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://cdna.artstation.com/p/assets/images/images/072/772/348/large/anup-kumar-final-2.jpg?1708159622',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://cdna.artstation.com/p/assets/images/images/072/772/348/large/anup-kumar-final-2.jpg?1708159622',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://cdna.artstation.com/p/assets/images/images/072/772/348/large/anup-kumar-final-2.jpg?1708159622',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://cdna.artstation.com/p/assets/images/images/072/772/348/large/anup-kumar-final-2.jpg?1708159622',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://cdna.artstation.com/p/assets/images/images/072/772/348/large/anup-kumar-final-2.jpg?1708159622',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://cdna.artstation.com/p/assets/images/images/043/436/266/large/lucas-miranda-render-final.jpg?1637253643',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdna.artstation.com/p/assets/images/images/043/436/266/large/lucas-miranda-render-final.jpg?1637253643',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://cdna.artstation.com/p/assets/images/images/043/436/266/large/lucas-miranda-render-final.jpg?1637253643',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://cdna.artstation.com/p/assets/images/images/043/436/266/large/lucas-miranda-render-final.jpg?1637253643',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://cdna.artstation.com/p/assets/images/images/043/436/266/large/lucas-miranda-render-final.jpg?1637253643',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://cdnb.artstation.com/p/assets/images/images/072/434/347/large/astrumaureum-snap2024-02-07-23-41-49.jpg?1707342276',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://cdnb.artstation.com/p/assets/images/images/072/434/347/large/astrumaureum-snap2024-02-07-23-41-49.jpg?1707342276',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://cdnb.artstation.com/p/assets/images/images/072/434/347/large/astrumaureum-snap2024-02-07-23-41-49.jpg?1707342276',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://cdnb.artstation.com/p/assets/images/images/072/434/347/large/astrumaureum-snap2024-02-07-23-41-49.jpg?1707342276',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://cdnb.artstation.com/p/assets/images/images/072/434/347/large/astrumaureum-snap2024-02-07-23-41-49.jpg?1707342276',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://cdnb.artstation.com/p/assets/images/images/055/374/297/large/miguel-manzanero-tiny-room-1-azul-oscuro.jpg?1666796760',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://cdnb.artstation.com/p/assets/images/images/055/374/297/large/miguel-manzanero-tiny-room-1-azul-oscuro.jpg?1666796760',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://cdnb.artstation.com/p/assets/images/images/055/374/297/large/miguel-manzanero-tiny-room-1-azul-oscuro.jpg?1666796760',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://cdnb.artstation.com/p/assets/images/images/055/374/297/large/miguel-manzanero-tiny-room-1-azul-oscuro.jpg?1666796760',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://cdnb.artstation.com/p/assets/images/images/055/374/297/large/miguel-manzanero-tiny-room-1-azul-oscuro.jpg?1666796760',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://cdnb.artstation.com/p/assets/images/images/025/094/089/large/josh-gambrell-render-01-postprocess.jpg?1584591264',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://cdnb.artstation.com/p/assets/images/images/025/094/089/large/josh-gambrell-render-01-postprocess.jpg?1584591264',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://cdnb.artstation.com/p/assets/images/images/025/094/089/large/josh-gambrell-render-01-postprocess.jpg?1584591264',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://cdnb.artstation.com/p/assets/images/images/025/094/089/large/josh-gambrell-render-01-postprocess.jpg?1584591264',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://cdnb.artstation.com/p/assets/images/images/025/094/089/large/josh-gambrell-render-01-postprocess.jpg?1584591264',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://cdnb.artstation.com/p/assets/images/images/044/464/659/large/samuel-greer-17.jpg?1640089996',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://cdnb.artstation.com/p/assets/images/images/044/464/659/large/samuel-greer-17.jpg?1640089996',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://cdnb.artstation.com/p/assets/images/images/044/464/659/large/samuel-greer-17.jpg?1640089996',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://cdnb.artstation.com/p/assets/images/images/044/464/659/large/samuel-greer-17.jpg?1640089996',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://cdnb.artstation.com/p/assets/images/images/044/464/659/large/samuel-greer-17.jpg?1640089996',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://cdnb.artstation.com/p/assets/images/images/026/468/013/large/sasho-lazeski-mr-robot-room-sasho-01.jpg?1588860048',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://cdnb.artstation.com/p/assets/images/images/026/468/013/large/sasho-lazeski-mr-robot-room-sasho-01.jpg?1588860048',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://cdnb.artstation.com/p/assets/images/images/026/468/013/large/sasho-lazeski-mr-robot-room-sasho-01.jpg?1588860048',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://cdnb.artstation.com/p/assets/images/images/026/468/013/large/sasho-lazeski-mr-robot-room-sasho-01.jpg?1588860048',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://cdnb.artstation.com/p/assets/images/images/026/468/013/large/sasho-lazeski-mr-robot-room-sasho-01.jpg?1588860048',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://cdna.artstation.com/p/assets/images/images/008/231/202/large/gabriel-solano-myrtleroom-final01-0034.jpg?1511351266',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://cdna.artstation.com/p/assets/images/images/008/231/202/large/gabriel-solano-myrtleroom-final01-0034.jpg?1511351266',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://cdna.artstation.com/p/assets/images/images/008/231/202/large/gabriel-solano-myrtleroom-final01-0034.jpg?1511351266',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://cdna.artstation.com/p/assets/images/images/008/231/202/large/gabriel-solano-myrtleroom-final01-0034.jpg?1511351266',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://cdna.artstation.com/p/assets/images/images/008/231/202/large/gabriel-solano-myrtleroom-final01-0034.jpg?1511351266',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://cdna.artstation.com/p/assets/images/images/065/817/640/large/ninjo3d-jose-alvarez-pers1-nightlight-image-watermark.jpg?1691318033',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://cdna.artstation.com/p/assets/images/images/065/817/640/large/ninjo3d-jose-alvarez-pers1-nightlight-image-watermark.jpg?1691318033',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://cdna.artstation.com/p/assets/images/images/065/817/640/large/ninjo3d-jose-alvarez-pers1-nightlight-image-watermark.jpg?1691318033',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://cdna.artstation.com/p/assets/images/images/065/817/640/large/ninjo3d-jose-alvarez-pers1-nightlight-image-watermark.jpg?1691318033',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://cdna.artstation.com/p/assets/images/images/065/817/640/large/ninjo3d-jose-alvarez-pers1-nightlight-image-watermark.jpg?1691318033',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://cdna.artstation.com/p/assets/images/images/062/047/652/large/mohamed-adel-1.jpg?1682244339',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://cdna.artstation.com/p/assets/images/images/062/047/652/large/mohamed-adel-1.jpg?1682244339',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://cdna.artstation.com/p/assets/images/images/062/047/652/large/mohamed-adel-1.jpg?1682244339',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://cdna.artstation.com/p/assets/images/images/062/047/652/large/mohamed-adel-1.jpg?1682244339',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://cdna.artstation.com/p/assets/images/images/062/047/652/large/mohamed-adel-1.jpg?1682244339',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://cdnb.artstation.com/p/assets/images/images/043/511/499/large/flavius-roiliand-good3.jpg?1637497041',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://cdnb.artstation.com/p/assets/images/images/043/511/499/large/flavius-roiliand-good3.jpg?1637497041',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://cdnb.artstation.com/p/assets/images/images/043/511/499/large/flavius-roiliand-good3.jpg?1637497041',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://cdnb.artstation.com/p/assets/images/images/043/511/499/large/flavius-roiliand-good3.jpg?1637497041',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://cdnb.artstation.com/p/assets/images/images/043/511/499/large/flavius-roiliand-good3.jpg?1637497041',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://cdna.artstation.com/p/assets/images/images/041/044/028/large/jesus-vielba-jesus-vielba-render-final.jpg?1630593635',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://cdna.artstation.com/p/assets/images/images/041/044/028/large/jesus-vielba-jesus-vielba-render-final.jpg?1630593635',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://cdna.artstation.com/p/assets/images/images/041/044/028/large/jesus-vielba-jesus-vielba-render-final.jpg?1630593635',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://cdna.artstation.com/p/assets/images/images/041/044/028/large/jesus-vielba-jesus-vielba-render-final.jpg?1630593635',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://cdna.artstation.com/p/assets/images/images/041/044/028/large/jesus-vielba-jesus-vielba-render-final.jpg?1630593635',
        preview: false
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
    }, {})
  }
};
