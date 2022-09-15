const ADD_TO_CART_EVENT = 'cart/productAdded';
const REMOVE_FROM_CART_EVENT = 'cart/productRemoved';
const ADD_TO_WISHLIST_EVENT = 'wl/productAdded';
const REMOVE_FROM_WISHLIST_EVENT = 'wl/productRemoved';

class NewsletterForm extends React.Component {
  state = {
    email: '',
    formMessage: '',
    busy: false,
    successMessage: '',
  };

  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  // event handlers need "this"
  onSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;

    if (!this.validateEmail(email)) {
      this.setState({
        formMessage: 'Please use a valid email',
      });

      return;
    }

    this.setState({
      busy: true,
      formMessage: '',
    });

    setTimeout(() => {
      this.setState({
        busy: false,
        email: '',
        successMessage: `Emailul ${this.state.email} a fost inscris.`,
      });
    }, 3000);
  };

  // controlled component/input
  onInputChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  // render runs everytime state changes
  render() {
    const isSubmitted = this.state.successMessage.trim().length > 0;

    if (isSubmitted) {
      return <div className="container">{this.state.successMessage}</div>;
    }

    // render must -RETURN- JSX
    return (
      <form className="form-newsletter container" onSubmit={this.onSubmit}>
        <label htmlFor="field-newsletter">
          Subscribe to our <span>newsletter</span>
        </label>

        <input
          type="text"
          name="field-newsletter"
          id="field-newsletter"
          placeholder="enter your email address to receive the latest news!"
          onChange={this.onInputChange}
          value={this.state.email}
        ></input>

        <button title="Subcribe" type="submit" disabled={this.state.busy}>
          {this.state.busy ? '...loading' : 'Submit'}
        </button>

        <div className="form-message">{this.state.formMessage}</div>
      </form>
    );
  }
}

const newsletterContainer = document.querySelector('.home-newsletter');
// React recipe?
ReactDOM.createRoot(newsletterContainer).render(
  <NewsletterForm></NewsletterForm>,
);

class AddToCartButton extends React.Component {
  state = {
    added: false,
  };

  onClick = () => {
    this.setState({
      busy: true,
    });

    setTimeout(() => {
      const eventName = this.state.added
        ? REMOVE_FROM_CART_EVENT
        : ADD_TO_CART_EVENT;

      dispatchEvent(
        new CustomEvent(eventName, {
          detail: {
            productId: this.props.productId,
          },
        }),
      );

      this.setState({
        added: !this.state.added,
        busy: false,
      });
    }, 2000);
  };

  // all components require a render
  render() {
    // render must retunr jsx
    return (
      <button
        className={`product-control ${this.state.added ? 'active' : ''}`}
        onClick={this.onClick}
        type="button"
        title={this.state.added === true ? 'Remove from cart' : 'Add to Cart'}
        disabled={this.state.busy}
      >
        {this.state.added === true
          ? `PID: ${this.props.productId} in cart`
          : 'Add to Cart'}
        {this.state.busy ? <i className="fas fa-spinner"></i> : ''}
      </button>
    );
  }
}

// function react component
const AddToWishlistButton = ({ productId }) => {
  const state = React.useState({
    added: false,
    busy: false,
  });
  const actualState = state[0];
  const setState = state[1];

  const onClick = () => {
    setState({
      added: actualState.added,
      busy: true,
    });

    setTimeout(() => {
      // dispatch event
      // aici 9
      const newEvent = new CustomEvent(
        actualState.added ? REMOVE_FROM_WISHLIST_EVENT : ADD_TO_WISHLIST_EVENT,
        {
          detail: {
            productId,
          },
        },
      );

      dispatchEvent(newEvent);

      setState({
        added: !actualState.added,
        busy: false,
      });
    }, 500);
  };

  return (
    <button
      className={`product-control ${actualState.added ? 'active' : ''}`}
      title={actualState.added ? 'Remove from Wishlist' : 'Add to Wishlist'}
      type="button"
      onClick={onClick}
    >
      {actualState.added === true
        ? `PID: ${productId} in wishlist`
        : 'Add to Wishlist'}
      {actualState.busy ? <i className="fas fa-spinner"></i> : ''}
    </button>
  );
};

class ProductControls extends React.Component {
  render() {
    const productId = this.props.productId;

    // study 1
    const WrappedButton = ({ productId }) => {
      return <AddToCartButton productId={productId}></AddToCartButton>;
    };

    // study 2
    const X = AddToWishlistButton;

    return [
      <WrappedButton productId={productId} key="cart"></WrappedButton>,
      <X key="wl" productId={this.props.productId}></X>,
    ];
  }
}

const productTileControls = document.querySelectorAll('.product-tile-controls');
productTileControls.forEach((productTileControl, index) => {
  ReactDOM.createRoot(productTileControl).render(
    <ProductControls productId={index}></ProductControls>,
  );
});

class HeaderCounters extends React.Component {
  state = {
    cartItemsCount: 0,
    cartItems: [],
    // de aici1
    wishlistItemsCount: 0,
    wishlistItems: [],
  };
  // de aici2
  productCartAction = (event) => {
    const { productId } = event.detail;
    const cartItems = this.state.cartItems.slice();
    // named destructure
    const { type: eventType } = event;

    switch (eventType) {
      case ADD_TO_CART_EVENT:
        cartItems.push(productId);
        this.setState({
          cartItems,
          cartItemsCount: this.state.cartItemsCount + 1,
        });
        break;

      case REMOVE_FROM_CART_EVENT:
        // filter clones as well
        this.setState({
          cartItems: cartItems.filter((item) => {
            return item !== productId;
          }),
          cartItemsCount: this.state.cartItemsCount - 1,
        });
        break;
    }
  };
  // aici6
  productWishlistAction = (event) => {
    const productId = event.detail.productId;
    const eventType = event.type;

    switch (eventType) {
      case ADD_TO_WISHLIST_EVENT:
        const newProductIds =
          this.state.wishlistItems.length === 0
            ? [productId]
            : [...this.state.wishlistItems, productId];

        this.setState({
          wishlistItems: newProductIds,
          wishlistItemsCount: this.state.wishlistItemsCount + 1,
        });
        break;

      case REMOVE_FROM_WISHLIST_EVENT:
        this.setState({
          wishlistItems: this.state.wishlistItems.filter((item) => {
            return item !== productId;
          }),
          wishlistItemsCount: this.state.wishlistItemsCount - 1,
        });
        break;
    }
  };

  componentDidMount() {
    // aici3
    addEventListener(ADD_TO_CART_EVENT, this.productCartAction);
    addEventListener(REMOVE_FROM_CART_EVENT, this.productCartAction);

    // aici7
    addEventListener(ADD_TO_WISHLIST_EVENT, this.productWishlistAction);
    addEventListener(REMOVE_FROM_WISHLIST_EVENT, this.productWishlistAction);
  }
  // nu trebuie facut in monochrome
  componentWillUnmount() {
    removeEventListener(ADD_TO_CART_EVENT, this.productCartAction);
    removeEventListener(REMOVE_FROM_CART_EVENT, this.productCartAction);

    removeEventListener(ADD_TO_WISHLIST_EVENT, this.productWishlistAction);
    removeEventListener(REMOVE_FROM_WISHLIST_EVENT, this.productWishlistAction);
  }

  // aici10

  // aici 4
  showProducts = (collectionName, displayName) => {
    let message = '';
    // dynamic acces with bracket notation
    if (this.state[collectionName].length <= 0) {
      message = `There are no products in your ${displayName}.`;
    } else {
      message = `These are the pids in your ${displayName}: ${this.state[collectionName]}`;
    }

    alert(message);
  };

  render() {
    return (
      <>
        <div
          className="header-counter"
          onClick={() => {
            // aici5
            this.showProducts('wishlistItems', 'wishlist');
          }}
        >
          {/* aici8 */}
          <span className="qty">{this.state.wishlistItemsCount}</span>
          <i className="fas fa-heart icon"></i>
        </div>

        <div
          className="header-counter"
          onClick={() => {
            // aici5
            this.showProducts('cartItems', 'cart');
          }}
        >
          <span className="qty">{this.state.cartItemsCount}</span>
          <i className="fas fa-shopping-cart icon"></i>
        </div>
      </>
    );
  }
}
// not necessary for monochrome
// aici10
class HCWrapper extends React.Component {
  state = {
    visible: true,
  };

  onClick = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  render() {
    return (
      <>
        <button title="title" onClick={this.onClick}>
          Toggle
        </button>
        {this.state.visible ? <HeaderCounters></HeaderCounters> : ''}
      </>
    );
  }
}

const headerCounters = document.querySelector('.header-counters');
// the good way
ReactDOM.createRoot(headerCounters).render(<HCWrapper></HCWrapper>);
