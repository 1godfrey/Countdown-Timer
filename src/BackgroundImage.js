function BackgroundImage() {
    const backgrounds = [
      './background1.jpg',
      './background2.jpg',
      './background3.jpg',
      './background4.jpg',
      './background5.jpg',
      './background6.jpg',
    ];
    const storedBackground = localStorage.getItem('background');
    const defaultBackground = backgrounds[0];
  
    const backgroundImage = backgrounds.includes(storedBackground)
      ? storedBackground
      : defaultBackground;
  
    return (
      <div
        className="bg-image"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    );
  }
  
  export default BackgroundImage;
  