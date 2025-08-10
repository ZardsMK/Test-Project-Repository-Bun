import axios from "axios";
import { JSDOM } from "jsdom"
import selectors from './selectors.js';


async function scrapeAmazon(keyword) {

  //take the url of the amazonwith the key recieve from the route "/api/scrape"

  const url = `https://www.amazon.com.br/s?k=${encodeURIComponent(keyword)}`;
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
    }
  });

  // create a HTML of the data

  const dom = new JSDOM(response.data);
  const document = dom.window.document;

  // use selector to take the informations from the HTML

  const products = [...document.querySelectorAll(selectors.productItem)];

  const results = products.map(product => {
    const titleElem = product.querySelector(selectors.title);
    const ratingElem = product.querySelector(selectors.rating);
    const reviewsElem = product.querySelector(selectors.reviewsCount);
    const imageElem = product.querySelector(selectors.image);

    return {
      title: titleElem ? titleElem.textContent.trim() : null,
      rating: ratingElem ? ratingElem.textContent.trim() : null,
      reviews: reviewsElem ? reviewsElem.textContent.trim() : null,
      image: imageElem ? imageElem.src : null,
    };
  });

  return results.filter(item => item.title);
}

export default scrapeAmazon;