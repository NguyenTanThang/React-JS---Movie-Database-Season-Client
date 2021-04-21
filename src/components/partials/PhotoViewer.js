import * as React from 'react';
import Viewer from 'react-viewer';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const photos = [
    {src: 'https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500', alt: ''},
    {src: 'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500', alt: ''},
    {src: 'https://images.pexels.com/photos/2922672/pexels-photo-2922672.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', alt: ''},
    {src: 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', alt: ''},
    {src: 'https://images.pexels.com/photos/1894350/pexels-photo-1894350.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', alt: ''},
]
 
class PhotoViewer extends React.Component {

    state = {
        visible: false,
        activeIndex: 0
    }
    
    setVisible = (visible) => {
        this.setState({
            visible
        })
    }

    renderPhotoItem = () => {
        const {setVisible} = this;

        let selectedPhotos = this.props.photos.length > 0 ? this.props.photos.map(photo => {
            return {...photo, src: photo.photoURL, alt: ""}
        }) : photos;

        const returnedPhotos = selectedPhotos.slice(0, 6).map((photo, index) => {
            return (
                <div className="photo-viewer-item" onClick={() => { 
                    this.setState({
                        activeIndex: index
                    })
                    setVisible(true); 
                }}>
                    <img src={photo.src} alt={photo.alt} className="img-fluid" />
                </div>
            )
        });

        return (
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 2}}
            >
                <Masonry gutter="20px">
                    {returnedPhotos}
                </Masonry>
            </ResponsiveMasonry>
        )
    }
 
    render() {
        const {visible, activeIndex} = this.state;
        const {setVisible, renderPhotoItem} = this;
        /*
        const {setVisible, visible} = this.props;
        */

        
        if (this.props.photos.length === 0) {
            return (<div className="text-center mt-4">
                <h5>Currently there is no photo</h5>
            </div>)
        }

        let selectedPhotos = this.props.photos.length > 0 ? this.props.photos.map(photo => {
            return {...photo, src: photo.photoURL, alt: ""}
        }) : photos;

        return (
            <div>
                <div className="photo-viewer-list">
                    {renderPhotoItem()}
                </div>
                {
                    selectedPhotos.length > 6 ? (
                        <button className="section__btn" onClick={() => { setVisible(true); } }>View More</button>
                    ) : (<></>)
                }
              <Viewer
              visible={visible}
              onClose={() => { setVisible(false); } }
              images={selectedPhotos}
              activeIndex={activeIndex}
              />
            </div>
          );
    }
  
}

export default PhotoViewer;