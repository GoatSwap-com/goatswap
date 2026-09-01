import React, { useEffect } from "react";
import { LiFiWidget, useWidgetEvents, WidgetEvent } from "@lifi/widget";

function EventsBridge({
  onRouteExecutionCompleted,
  onRouteExecutionFailed,
  onRouteExecutionStarted,
  onRouteExecutionUpdated,
  onRouteSelected,
  onAvailableRoutes,
}) {
  const widgetEvents = useWidgetEvents();

  useEffect(() => {
    console.log("EventsBridge mounted, callbacks status:", {
      onRouteExecutionCompleted: !!onRouteExecutionCompleted,
      onRouteExecutionFailed: !!onRouteExecutionFailed,
      onRouteExecutionStarted: !!onRouteExecutionStarted,
      onRouteExecutionUpdated: !!onRouteExecutionUpdated,
      onRouteSelected: !!onRouteSelected,
      onAvailableRoutes: !!onAvailableRoutes,
    });

    const onCompleted = (route) => {
      console.log("LiFiWidget event: RouteExecutionCompleted", route);
      onRouteExecutionCompleted?.(route);
    };
    const onFailed = (route) => {
      console.log("LiFiWidget event: RouteExecutionFailed", route);
      onRouteExecutionFailed?.(route);
    };
    const onStarted = (route) => {
      console.log("LiFiWidget event: RouteExecutionStarted", route);
      onRouteExecutionStarted?.(route);
    };
    const onUpdated = (route) => {
      console.log("LiFiWidget event: RouteExecutionUpdated", route);
      onRouteExecutionUpdated?.(route);
    };

    const onSelected = (data) => onRouteSelected?.(data); // { route, routes }
    const onRoutes = (routes) => onAvailableRoutes?.(routes);

    widgetEvents.on(WidgetEvent.RouteExecutionCompleted, onCompleted);
    widgetEvents.on(WidgetEvent.RouteExecutionFailed, onFailed);
    widgetEvents.on(WidgetEvent.RouteExecutionStarted, onStarted);
    widgetEvents.on(WidgetEvent.RouteExecutionUpdated, onUpdated);
    widgetEvents.on(WidgetEvent.AvailableRoutes, onRoutes);
    widgetEvents.on(WidgetEvent.RouteSelected, onSelected);

    return () => {
      console.log("EventsBridge unmounted");
      widgetEvents.off(WidgetEvent.RouteExecutionCompleted, onCompleted);
      widgetEvents.off(WidgetEvent.RouteExecutionFailed, onFailed);
      widgetEvents.off(WidgetEvent.RouteExecutionStarted, onStarted);
      widgetEvents.off(WidgetEvent.RouteExecutionUpdated, onUpdated);
      widgetEvents.off(WidgetEvent.AvailableRoutes, onRoutes);
      widgetEvents.off(WidgetEvent.RouteSelected, onSelected);
    };
  }, [
    widgetEvents,
    onRouteExecutionCompleted,
    onRouteExecutionFailed,
    onRouteExecutionStarted,
    onRouteExecutionUpdated,
  ]);

  return null;
}

export function LiFiWidgetWithEvents({
  config,
  onRouteExecutionCompleted,
  onRouteExecutionFailed,
  onRouteSelected,
  onAvailableRoutes,
}) {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(LiFiWidget, {
      config: config,
      integrator: config.integrator,
    }),
    React.createElement(EventsBridge, {
      onRouteExecutionCompleted: onRouteExecutionCompleted,
      onRouteExecutionFailed: onRouteExecutionFailed,
      onRouteSelected,
      onAvailableRoutes,
    }),
  );
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function extractUsdAmounts(routeOrUpdate) {
  const route = routeOrUpdate?.route ?? routeOrUpdate;
  return {
    fromAmountUSD: Number(route?.fromAmountUSD) || 0,
    toAmountUSD: Number(route?.toAmountUSD) || 0,
  };
}

export function formatRouteMessage(routeOrUpdate) {
  if (!routeOrUpdate) return "";

  // Failed events return { route, process }
  const route = routeOrUpdate.route ? routeOrUpdate.route : routeOrUpdate;
  const errorMsg =
    routeOrUpdate.process?.error?.message || routeOrUpdate.error?.message;

  const fromSymbol = escapeHtml(route.fromToken?.symbol || "Unknown");
  const toSymbol = escapeHtml(route.toToken?.symbol || "Unknown");

  // Format amount based on decimals
  const fromDecimals = route.fromToken?.decimals || 18;
  const fromAmountRaw = Number(route.fromAmount) || 0;
  const fromAmount = (fromAmountRaw / Math.pow(10, fromDecimals)).toFixed(4);

  const toDecimals = route.toToken?.decimals || 18;
  const toAmountRaw = Number(route.toAmount) || 0;
  const toAmount = (toAmountRaw / Math.pow(10, toDecimals)).toFixed(4);

  // Chain ID mappings
  const chainMap = {
    1: "Ethereum",
    10: "Optimism",
    56: "BSC",
    100: "Gnosis",
    137: "Polygon",
    250: "Fantom",
    324: "zkSync",
    1101: "Polygon zkEVM",
    8453: "Base",
    42161: "Arbitrum",
    43114: "Avalanche",
    59144: "Linea",
    81457: "Blast",
    534352: "Scroll",
    1392: "Sui",
    115111108109112: "Solana",
  };

  const fromChain = escapeHtml(
    chainMap[route.fromChainId] || `Chain ${route.fromChainId}`,
  );
  const toChain = escapeHtml(
    chainMap[route.toChainId] || `Chain ${route.toChainId}`,
  );

  // Extract wallet addresses from steps
  const fromAddress = route.steps?.[0]?.action?.fromAddress || "";
  const toAddress =
    route.steps?.[route.steps.length - 1]?.action?.toAddress ||
    route.steps?.[0]?.action?.toAddress ||
    "";

  const formattedFromAddress = fromAddress
    ? `<code>${escapeHtml(fromAddress)}</code>`
    : "N/A";
  const formattedToAddress = toAddress
    ? `<code>${escapeHtml(toAddress)}</code>`
    : "N/A";

  // Extract Route ID and Tx Hashes
  const routeId = route.id || "";
  const txHashes = [];
  if (routeOrUpdate.process?.txHash) {
    txHashes.push(routeOrUpdate.process.txHash);
  }
  if (route.steps) {
    for (const step of route.steps) {
      if (step.execution?.process) {
        for (const p of step.execution.process) {
          if (p.txHash && !txHashes.includes(p.txHash)) {
            txHashes.push(p.txHash);
          }
        }
      }
    }
  }

  const formattedRouteId = routeId
    ? `<code>${escapeHtml(routeId)}</code>`
    : "N/A";
  const formattedTxHashes =
    txHashes.length > 0
      ? txHashes.map((h) => `<code>${escapeHtml(h)}</code>`).join(", ")
      : "N/A";

  let msg =
    `<b>SWAP Info:</b>\n` +
    `<b>From:</b> ${fromAmount} ${fromSymbol} (${fromChain}) | Addr: ${formattedFromAddress}\n` +
    `<b>To:</b> ${toAmount} ${toSymbol} (${toChain}) | Addr: ${formattedToAddress}\n` +
    `<b>Route ID:</b> ${formattedRouteId}\n` +
    `<b>Tx Hash(es):</b> ${formattedTxHashes}`;

  if (errorMsg) {
    msg += `\n<b>Status:</b> ❌ FAILED\n<b>Reason:</b> <i>${escapeHtml(errorMsg)}</i>`;
  } else {
    msg += `\n<b>Status:</b> ✅ SUCCESS`;
  }

  return msg;
}
