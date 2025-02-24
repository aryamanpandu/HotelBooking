async function fetchNav(elementID) {
    const response = await fetch('../../public/nav.html');
    elementID.innerHTML = await response.text();
    
}