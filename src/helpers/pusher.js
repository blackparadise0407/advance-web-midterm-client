import Pusher from 'pusher-js'

const pusher = new Pusher('ac4b6b732bb05d85e704', {
  cluster: 'ap1'
});

export default pusher