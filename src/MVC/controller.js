import Model from './model';
import View from './view';
import ballonTemplate from '../templates/ballon.html';

export default {
    app: document.getElementById('app'),
    getReview() {
        const name = document.querySelector('.reviews-form__name');
        const place = document.querySelector('.reviews-form__place');
        const comment = document.querySelector('.reviews-form__comment');

        return {
            name: name.value,
            place: place.value,
            comment: comment.value,
            time: Model.getTime()
        }
    },
    init() {
        ymaps.ready(() => {
            let map, clusterer, form;
            const formCoords = {
                get(coord) {
                    return coord === 'x' ? this.x : this.y;
                },
                update(x, y) {
                    this.x = x;
                    this.y = y;
                }
            };
            const render = (form) => {
                this.app.style.top = `${formCoords.get('y')}px`;
                this.app.style.left = `${formCoords.get('x')}px`;
                this.app.innerHTML = View.renderForm(form);
            };
            class Form {
                static async create(coords) {
                    const form = new Form(coords);
                    form.address = await Model.geocode(coords);

                    return form;
                }
                constructor(coords) {
                    this.coords = coords;
                    this.reviews = [];
                }
            }

            map = new ymaps.Map('map', {
                center: [55.76, 37.64],
                zoom: 14,
                controls: ['zoomControl']
            });

            const customItemContentLayout = ymaps.templateLayoutFactory.createClass(ballonTemplate, {
                build() {
                    form = this.getData().properties.get('form');
                    customItemContentLayout.superclass.build.call(this);
                    const link = document.querySelector('.ballon__link');

                    link.addEventListener('click', e => {
                        map.balloon.close();
                        formCoords.update(e.clientX, e.clientY);
                        render(form);
                    });
                }
            });

            clusterer = new ymaps.Clusterer({
                clusterDisableClickZoom: true,
                clusterOpenBalloonOnClick: true,
                clusterBalloonContentLayout: 'cluster#balloonCarousel',
                clusterBalloonItemContentLayout: customItemContentLayout,
                clusterBalloonPanelMaxMapArea: 0,
                clusterBalloonContentLayoutWidth: 200,
                clusterBalloonContentLayoutHeight: 130,
                clusterBalloonPagerSize: 5
            });

            map.geoObjects.add(clusterer);

            map.events.add('click', async e => {
                const coords = e.get('coords');

                formCoords.update(e.get('domEvent').get('pageX'), e.get('domEvent').get('pageY'));
                form = await Form.create(coords);
                render(form);
            });

            const handler = e => {
                if (e.target.classList.contains('reviews-form__btn')) {
                    const review = this.getReview();

                    form.reviews.push(review);
                    const placemark = new ymaps.Placemark(form.coords, { ...review, address: form.address, form });

                    placemark.events.add('click', e => {
                        map.balloon.close();
                        form = e.get('target').properties.get('form');
                        formCoords.update(e.get('domEvent').get('pageX'), e.get('domEvent').get('pageY'));
                        render(form);
                    });
                    clusterer.add(placemark);
                    render(form);
                }
                if (e.target.classList.contains('reviews__btn-close')) {
                    this.app.innerHTML = '';
                }
            };

            document.addEventListener('click', handler);
        });
    }
}