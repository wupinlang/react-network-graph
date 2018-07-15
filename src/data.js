const data = {
  "nodes":[
  {
    "id":"7ecfa61e54bd256cdc054d22d2f5e16f",
    "labels":"Organization",
    "properties":{
      "name":"nuTonomy",
      "logo_url":"http://public.crunchbase.com/t_api_images/o9kauimuu8ybeu7d6lek"
    }
  },
  {
    "id":"2c32e169cf4c1b083952b5ad04e74fbb",
    "labels":"Organization",
    "properties":{
      "name":"Fontinalis Partners",
      "logo_url":"http://public.crunchbase.com/t_api_images/v1496420794/hbqwufhek7z1l1rqjst3.png"
    }
  },
],
  "relationships":[
  {
    "id":"rel-ind:0",
    "type":"Board Director",
    "source":"7ecfa61e54bd256cdc054d22d2f5e16f",
    "target":"2c32e169cf4c1b083952b5ad04e74fbb",
    "properties":{

    }
  }

  ]
};

data.relationships.forEach(item => {
  item.linknum = 1;
})
export default data;
