export default {
    async geocode(coords) {
        const response = await ymaps.geocode(coords);
        const firstGeoObject = response.geoObjects.get(0);

        return firstGeoObject.getAddressLine();
    },
    getTime() {
        const now = new Date();

        return `${now.getDate()}.${(now.getMonth() + 1)}.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    }
}