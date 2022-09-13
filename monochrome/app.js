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

  onInputChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  render() {
    const isSubmitted = this.state.successMessage.trim().length > 0;

    if (isSubmitted) {
      return <div className="container">{this.state.successMessage}</div>;
    }

    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="email-newsletter">sign up for our newsletter</label>
        <input
          type="email"
          name="email"
          id="email-newsletter"
          onChange={this.onInputChange}
          value={this.state.email}
        />
        <button title="Subcribe" type="submit" disabled={this.state.busy}>
          {this.state.busy ? '...loading' : 'Submit'}
        </button>

        <div className="form-message">{this.state.formMessage}</div>
      </form>
    );
  }
}

const newsletterContainer = document.querySelector(
  '.footer-sign-up-newsletter',
);
// React recipe?
ReactDOM.createRoot(newsletterContainer).render(
  <NewsletterForm></NewsletterForm>,
);

class AddToCartButton extends React.Component {
  state = {
    added: false,
  };

  onClick = (event) => {
    event.preventDefault();
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
      <a
        className={`${this.state.added ? 'active' : ''}`}
        href=""
        onClick={this.onClick}
        title={this.state.added === true ? 'Remove from cart' : 'Add to Cart'}
      >
        {this.state.added === true ? (
          `Added: ${this.props.productId}`
        ) : (
          <i className="far fa-plus-square"></i>
        )}
        {this.state.busy ? <i className="fas fa-spinner"></i> : ''}
      </a>
    );
  }
}

const AddToWishlistButton = ({ productId }) => {
  const state = React.useState({
    added: false,
    busy: false,
  });
  const actualState = state[0];
  const setState = state[1];

  const onClick = (event) => {
    event.preventDefault();
    setState({
      added: actualState.added,
      busy: true,
    });

    setTimeout(() => {
      // dispatch event
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
    <a
      className={`${actualState.added ? 'active' : ''}`}
      href=""
      title={actualState.added ? 'Remove from Wishlist' : 'Add to Wishlist'}
      onClick={onClick}
    >
      {actualState.added === true ? (
        `Added: ${productId}`
      ) : (
        <i className="far fa-heart"></i>
      )}
      {actualState.busy ? <i className="fas fa-spinner"></i> : ''}
    </a>
  );
};

class ProductControls extends React.Component {
  render() {
    return [
      <AddToCartButton
        key="cart"
        productId={this.props.productId}
      ></AddToCartButton>,
      <AddToWishlistButton
        key="wl"
        productId={this.props.productId}
      ></AddToWishlistButton>,
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
    wishlistItemsCount: 0,
    wishlistItems: [],
  };

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
    }
  };

  componentDidMount() {
    addEventListener(ADD_TO_CART_EVENT, this.productCartAction);
    addEventListener(REMOVE_FROM_CART_EVENT, this.productCartAction);

    addEventListener(ADD_TO_WISHLIST_EVENT, this.productWishlistAction);
    addEventListener(REMOVE_FROM_WISHLIST_EVENT, this.productWishlistAction);
  }

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
        <a
          href="http://"
          title="Saved Items"
          onClick={() => {
            // aici5
            this.showProducts('wishlistItems', 'wishlist');
          }}
        >
          {this.state.wishlistItemsCount} <i className="far fa-heart"></i>
        </a>

        <a
          href="http://"
          title="Cart"
          onClick={() => {
            // aici5
            this.showProducts('cartItems', 'cart');
          }}
        >
          {this.state.cartItemsCount} <i className="fas fa-shopping-bag"></i>
        </a>
      </>
    );
  }
}

const headerCounters = document.querySelector('.header-counters');
// the good way
ReactDOM.createRoot(headerCounters).render(<HeaderCounters></HeaderCounters>);
