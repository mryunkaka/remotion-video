# Asset provider policy

Provider adapter contract: each provider accepts a project-local request and returns local file paths plus provenance (provider/source URL, creator, license/terms, retrieval date, prompt or modifications). Implement provider-specific adapters only when selected; never embed secrets in source. Supported modes: user-supplied media, licensed stock, verified public-domain sources, local ComfyUI, and explicitly approved image-generation APIs. No paid calls without user approval after price, credits, and configuration review.

Hardware discovery on this machine found AMD Radeon Graphics, driver 31.0.21925.1001. CUDA is not assumed. Verify ComfyUI backend/runtime and driver compatibility before enabling local generation; use API or supplied assets otherwise.
