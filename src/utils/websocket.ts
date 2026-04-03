export class WebSocketService {
  private ws: WebSocket | null = null;
  private onMessageCallback: ((data: any) => void) | null = null;

  constructor(private url: string) {}

  connect(onMessage?: (data: any) => void) {
    if (this.ws) return;

    if (onMessage) {
      this.onMessageCallback = onMessage;
    }

    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log("WebSocket 连接成功");
    };

    this.ws.onmessage = (event) => {
      //   console.log("收到消息:", event.data);
      try {
        const data = JSON.parse(event.data);
        this.onMessageCallback?.(data);
      } catch {
        this.onMessageCallback?.(event.data);
      }
    };
    this.ws.onclose = () => {
      console.log("连接关闭");
      this.ws = null;
    };
  }

  send(data: any) {
    this.ws?.send(JSON.stringify(data));
  }

  close() {
    this.ws?.close();
    this.ws = null;
  }
}

export const wsService = new WebSocketService(import.meta.env.VITE_WEBSOCKET);
