type OfferGalleryProps = {
  images: string[];
};

function OfferGallery({ images }: OfferGalleryProps): JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.map((image, index) => (
          <div className="offer__image-wrapper" key={image}>
            <img
              className="offer__image"
              src={image}
              alt={`Photo studio ${index + 1}`}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferGallery;
