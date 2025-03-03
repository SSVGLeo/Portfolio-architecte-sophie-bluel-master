import {fetchWorks, displayFilters} from './js/api.js';
import {setupLogin} from './js/authentification.js';
// import {setupModal} from './js/modal.js';

console.log("Js bien importé");

setupLogin();

displayFilters();
setupFilters();
fetchWorks();


// setupModal();