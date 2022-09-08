const ADD_TO_CART_EVENT = 'cart/productAdded';
const REMOVE_FROM_CART_EVENT = 'cart/productRemoved';

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
  };

  componentDidMount() {
    addEventListener(ADD_TO_CART_EVENT, (event) => {
      const productId = event.detail.productId;
      // slice will clone the array
      const cartItems = this.state.cartItems.slice();
      cartItems.push(productId);

      this.setState({
        cartItemsCount: cartItems.length,
        cartItems,
      });
    });

    addEventListener(REMOVE_FROM_CART_EVENT, (event) => {
      const productId = event.detail.productId;
      const cartItems = this.state.cartItems.filter((cartItem) => {
        return productId !== cartItem;
      });

      this.setState({
        cartItemsCount: cartItems.length,
        cartItems,
      });
    });
  }

  showProducts = () => {
    let message = '';

    if (this.state.cartItems.length <= 0) {
      message = 'There are no products in your cart';
    } else {
      message = `These are the pids in your cart: ${this.state.cartItems}`;
    }

    alert(message);
  };

  render() {
    return (
      <>
        <a href="http://" title="Saved Items" onClick={this.showProducts}>
          {this.state.cartItemsCount} <i className="far fa-heart"></i>
        </a>

        <a href="http://" title="Cart" onClick={this.showProducts}>
          {this.state.cartItemsCount} <i className="fas fa-shopping-bag"></i>
        </a>
      </>
    );
  }
}

const headerCounters = document.querySelector('.header-counters');
// the good way
ReactDOM.createRoot(headerCounters).render(<HeaderCounters></HeaderCounters>);
