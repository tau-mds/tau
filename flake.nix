{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    inputs:
    inputs.flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import inputs.nixpkgs { inherit system; };
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            fnm
            pnpm
          ];

          shellHook = ''
            if ! npm list -g @antfu/ni >/dev/null 2>&1; then
              echo "Package `@antfu/ni` not found. Installing globally..."
              npm i -g @antfu/ni
            fi
          '';
        };
      }
    );
}
