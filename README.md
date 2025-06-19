# ws-rpc-handler

A http API for handling subscription based JSON RPC methods which requires web socket connection. This API handles the below methods:

#### 1. zond_subscribe

A method that subscribes to specific Ethereum events, returning a subscription ID used to receive notifications. A unique subscription ID that can be used to unsubscribe or identify incoming notifications will be returned.

- ##### Request

> ```typescript
> const response = await axios.post(
>   'http://<ws-rpc-handler-url>/zond_subscribe',
>   {
>     params: [
>       'logs',
>       {
>         address: 'Z208318ecd68f26726CE7C54b29CaBA94584969B6',
>         topics: [
>           '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a57b7edb8d6',
>         ],
>       },
>     ],
>   },
> );
> ```

- ##### Response

> ```json
> "0xbb0ecff80c39d75faac664a6dff7c43a"
> ```

#### 2. zond_unsubscribe

A method that unsubscribes from a specific Ethereum event, using the subscription ID provided by eth_subscribe. A boolean value indicating whether the unsubscription was successful will be returned.

- ##### Request

> ```typescript
> const response = await axios.post(
>   'http://<ws-rpc-handler-url>/zond_unsubscribe',
>   {
>     params: ['0xbb0ecff80c39d75faac664a6dff7c43a'],
>   },
> );
> ```

- ##### Response

> ```json
> true
> ```
